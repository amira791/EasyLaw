# Generated by Django 5.0.3 on 2024-04-23 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Payement_Validation', '0004_rename_id_abonnement_subid'),
    ]

    operations = [
        migrations.AddField(
            model_name='abonnement',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='abonnement',
            name='SubId',
            field=models.CharField(max_length=100),
        ),
    ]
