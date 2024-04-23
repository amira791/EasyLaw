from Payement_Validation.models import Abonnement
from Payement_Validation.serializers import AbonnementFullSerializer



def is_Allowed(userId, permission_code):

    abonnement = Abonnement.objects.filter(user = userId)
    return abonnement[0].service.accesses.filter(code = permission_code).exists()
    