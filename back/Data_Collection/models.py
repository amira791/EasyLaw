from django.db import models
from django.db import models
from django.db.models import Max
from django.utils import timezone

from User.models import CustomUser 

class Scrapping(models.Model):
    STATE_CHOICES = (
        ('failed', 'Failed'),
        ('success', 'Success'),
        ('loading', 'Loading'),
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now().date(), null=True)
    state = models.CharField(max_length=20, choices=STATE_CHOICES ,default='failed')

class IntrestDomain(models.Model):
    name = models.CharField(max_length=100)

class OfficialJournal(models.Model):
    number = models.IntegerField()
    year = models.IntegerField()
    text_file = models.FileField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['number', 'year'], name='unique_official_journal')
        ]

class JuridicalTextManager(models.Manager):
    def get_max_publication_date(self):
        return self.aggregate(max_date=Max('publication_date'))['max_date']

class JuridicalText(models.Model):
    id_text = models.CharField(primary_key=True, max_length=100)
    type_text = models.CharField(max_length=100)
    signature_date = models.DateField(null = True)
    publication_date = models.DateField(null = True)
    jt_number = models.CharField(max_length=100, null = True)
    source = models.CharField(max_length=100, null = True)
    official_journal = models.ForeignKey(OfficialJournal, on_delete=models.CASCADE, related_name='juridical_texts')
    official_journal_page = models.IntegerField()
    description = models.TextField(null = True)
    text_file = models.FileField(null = True) #path example : files/JTs/{rest of the path}
    extracted_text = models.TextField(null=True)  # New field for extracted text
    intrest = models.ForeignKey(IntrestDomain, null=True, on_delete=models.SET_NULL)  # New field
    scrapping = models.ForeignKey(Scrapping, null=True, on_delete=models.SET_NULL)  # New field

    objects = JuridicalTextManager()

class Adjutstement(models.Model):
    adjusted_num = models.CharField(max_length=100)
    adjusting_num = models.CharField(max_length=100)
    adjustment_type = models.CharField(max_length=100)