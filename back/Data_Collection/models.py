from django.db import models

class OfficialJournal(models.Model):
    number = models.IntegerField()
    year = models.IntegerField()
    text_file = models.FileField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['number', 'year'], name='unique_official_journal')
        ]

class JuridicalText(models.Model):
    id_text = models.CharField(primary_key=True, max_length=100)
    type_text = models.CharField(max_length=100)
    signature_date = models.DateField()
    publication_date = models.DateField()
    jt_number = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    official_journal_number = models.IntegerField()
    official_journal_year = models.IntegerField()
    official_journal = models.ForeignKey(OfficialJournal, on_delete=models.CASCADE, related_name='juridical_texts')
    official_journal_page = models.IntegerField()
    description = models.TextField()
    text_file = models.FileField()
