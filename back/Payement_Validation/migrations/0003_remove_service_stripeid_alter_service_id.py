# Generated by Django 5.0.3 on 2024-04-04 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Payement_Validation', '0002_service_stripeid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='stripeId',
        ),
        migrations.AlterField(
            model_name='service',
            name='id',
            field=models.CharField(max_length=20, primary_key=True, serialize=False),
        ),
    ]
