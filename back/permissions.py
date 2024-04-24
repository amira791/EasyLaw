from Payement_Validation.models import Abonnement
from Payement_Validation.serializers import AbonnementFullSerializer
from datetime import datetime



def is_Allowed(userId, permission_code):

    abonnement = Abonnement.objects.filter(user = userId, statut= "active")
    if(not(len(abonnement))):
        return False
    abonnement = checkSubscriptionEnd(abonnement[0])
    if(not(abonnement)):
        return False
    return abonnement.service.accesses.filter(code = permission_code).exists()
    


def checkSubscriptionEnd(abonnement):
    if(abonnement.dateFin<datetime.now().date()):
        abonnement.statut = "ended"
        abonnement.save()
        return None
    else:
        return abonnement