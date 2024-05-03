from django.conf import settings

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

from .serializers import *
from .models import Abonnement

from permissions import is_Allowed, checkSubscriptionEnd

from datetime import datetime
import random

import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY





@api_view(['Get'])
def getServices(request):

    services = Service.objects.all()
    
    
    serializer = ServiceSerializer(services, many=True)
    serialized_data = serializer.data

    res = {"all" : serialized_data, "current" : None}

    if request.user.is_authenticated:
        userId = request.user.id
        current = Abonnement.objects.filter(user = userId, statut = "active")
        if(len(current)):
            abonnement = checkSubscriptionEnd(current[0])
            if(abonnement):
                res["current"] =  abonnement.service.id

    return Response(res, status=status.HTTP_200_OK)






@api_view(['Post'])
def addUser(request):
    name = request.data.get('name')
    email = request.data.get('email')

    try:
        existing_customer = stripe.Customer.list(email=email, limit=1)
        if existing_customer.data:
            return Response({'stripe_customer_id': existing_customer.data[0].stripeCustomerId}, status=status.HTTP_200_OK)
        else:

            stripe_customer = stripe.Customer.create(
                email=email,
                name=name
            )
            return Response({'stripe_customer_id': stripe_customer.id}, status=status.HTTP_201_CREATED)
    except stripe.error.StripeError as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['Post'])
@permission_classes([IsAuthenticated])
def subscribe(request):
    customerId = request.user.stripeCustomerId
    userId = request.user.id
    priceId = request.data.get('priceId')
    token = request.data.get('token')
    method = request.data.get('paymentMethod')


    if(method == "Dhahabia" and token["card"]["brand"] != "UnionPay"):
        return Response({'message': "please enter a valid Dhahabia card (starting with 62..)"}, status=status.HTTP_400_BAD_REQUEST)

    subs = Abonnement.objects.filter(user=userId, statut="active")
    updgrading = None

    if(len(subs)):
        for sub in subs:
            if(sub.service.priceId == priceId):
                return Response({"message" : "this user is already subscribed"}, status=status.HTTP_409_CONFLICT)
                break
            else:
                updgrading = sub.id.split("-")[0]
                sub.statut="upgraded"
                sub.save()

    #Execution
    try:

        #payement method atttachement
        paymentMethod = stripe.PaymentMethod.create(
            type="card",
            card= {
                "token": token['id']
                }
        )
        stripe.PaymentMethod.attach(
            paymentMethod.id,
            customer=customerId
        )


        if(updgrading):
            item = stripe.Subscription.retrieve(updgrading)["items"]["data"][0]["id"]

            stripeSubscription = stripe.Subscription.modify(
                updgrading,
                default_payment_method= paymentMethod.id,
                items=[{"id": item, "price": priceId}],
                billing_cycle_anchor="now",
            )
        else:
            #creating the subscription
            stripeSubscription = stripe.Subscription.create(
                customer=customerId,
                items=[
                    {
                        "price": priceId,  
                    }
                ],
                default_payment_method= paymentMethod.id,
                cancel_at_period_end = True,
            )
    
        #retreiving the invoice associated 
        invoice = stripe.Invoice.retrieve(stripeSubscription.latest_invoice)
         
        
        #saving to our database 
        subscription = {
            "id": stripeSubscription.id +"-"+str(random.randrange(1000)),
            "dateDebut": datetime.now().strftime('%Y-%m-%d'),
            "dateFin": datetime.fromtimestamp(stripeSubscription.current_period_end).strftime('%Y-%m-%d'),
            "statut": stripeSubscription.status,
            "user": userId,
            "service": stripeSubscription.plan.product,
            "facture": {
                "id": invoice.id,
                "date": datetime.now().strftime('%Y-%m-%d'),
                "montant": invoice.amount_due/100,
                "montant_payé" : invoice.amount_paid/100,
                "payé" : invoice.amount_paid == invoice.amount_due,
                "methode_de_payment" : method,
                "pdf": invoice.invoice_pdf,
            }
         }


        serializer = AbonnementSerializer(data=subscription)
        if serializer.is_valid():
            serializer.save()
            return Response(subscription, status=status.HTTP_201_CREATED)
        else :
            return Response({'message': str(serializer.errors), 'valid':serializer.is_valid()}, status=status.HTTP_400_BAD_REQUEST)

    except stripe.error.StripeError as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['Get'])
@permission_classes([IsAuthenticated])
def getsubscription(request):
    userId = request.user.id

    abonnement = Abonnement.objects.filter(user = userId, statut = "active")
    if(len(abonnement) and not(checkSubscriptionEnd(abonnement[0]))):
        return Response([], status=status.HTTP_200_OK)

    serializer = AbonnementFullSerializer(abonnement, many= True)
    serialized_data = serializer.data

    return Response(serialized_data, status=status.HTTP_200_OK)



@api_view(['Get'])
@permission_classes([IsAuthenticated])
def getinvoices(request):
    userId = request.user.id

    abonnement = Abonnement.objects.filter(user = userId)
    serializer = AbonnementFullSerializer(abonnement, many=True)
    serialized_data = serializer.data
    factures = [{"facture":abonnement_instance["facture"], "service": abonnement_instance["service"]["nom"]} for abonnement_instance in serialized_data]
    

    return Response(factures, status=status.HTTP_200_OK)
