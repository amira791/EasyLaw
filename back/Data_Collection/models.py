from django.db import models

class OfficialJournal(models.Model):
    number = models.IntegerField()
    year = models.IntegerField()
    text_file = models.FileField() # path example : files/JOs/{rest of the path}

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['number', 'year'], name='unique_official_journal')
        ]

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

class Adjutstement(models.Model):
    adjusted_num = models.CharField(max_length=100)
    adjusting_num = models.CharField(max_length=100)
    adjustment_type = models.CharField(max_length=100)