# Generated by Django 5.0.3 on 2024-04-23 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Payement_Validation', '0002_remove_facture_montant_restant_facture_payé'),
    ]

    operations = [
        migrations.AddField(
            model_name='access',
            name='code',
            field=models.CharField(default='search', max_length=10),
            preserve_default=False,
        ),
    ]
