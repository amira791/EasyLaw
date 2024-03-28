from django.conf import settings

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

# Create your views here.
@api_view(['Post'])
def addUser(request):
    name = request.data.get('name')
    email = request.data.get('email')

    try:
        existing_customer = stripe.Customer.list(email=email, limit=1)
        if existing_customer.data:
            return Response({'stripe_customer_id': existing_customer.data[0].id}, status=status.HTTP_200_OK)
        else:

            stripe_customer = stripe.Customer.create(
                email=email,
                name=name
            )
            return Response({'stripe_customer_id': stripe_customer.id}, status=status.HTTP_201_CREATED)
    except stripe.error.StripeError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['Post'])
def subscribe(request):
    customerId = request.data.get('customerId')
    priceId = request.data.get('priceId')

    try:

        paymentMethod = stripe.PaymentMethod.create(
            type="card",
            card= {
                "token": "tok_mastercard"
                }
        )

        stripe.PaymentMethod.attach(
            paymentMethod.id,
            customer=customerId
        )

        subscription = stripe.Subscription.create(
            customer=customerId,
            items=[
                {
                    "price": priceId,  
                }
            ],
            default_payment_method= paymentMethod.id
        )
        return Response({'subscriptionId': subscription.id}, status=status.HTTP_201_CREATED)

    except stripe.error.StripeError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['Get'])
def getsubscription(request):
    customerId = request.data.get('customerId')

    try:

        subscriptions = stripe.Subscription.list(customer=customerId).data

        if(len(subscriptions)>0):
            price = subscriptions[0]["items"].data[0].plan
        
            product = stripe.Product.retrieve(price.product)

            return Response({"customer": customerId, "priceId":price.id, "plan":product.name, "description":product.description,"price":price.amount/100}, status=status.HTTP_201_CREATED)

    except stripe.error.StripeError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)