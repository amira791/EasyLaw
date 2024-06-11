# Generated by Django 5.0.3 on 2024-05-28 05:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Access',
            fields=[
                ('id', models.IntegerField(auto_created=True, primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=10)),
                ('nom', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Facture',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('montant', models.FloatField()),
                ('montant_payé', models.FloatField()),
                ('payé', models.BooleanField()),
                ('methode_de_payment', models.CharField(max_length=20, null=True)),
                ('pdf', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='DomainInterets',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=30)),
                ('users', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('tarif', models.FloatField()),
                ('priceId', models.CharField(max_length=30)),
                ('accesses', models.ManyToManyField(to='Payement_Validation.access')),
            ],
        ),
        migrations.CreateModel(
            name='Abonnement',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('dateDebut', models.DateField()),
                ('dateFin', models.DateField()),
                ('statut', models.CharField(max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('facture', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Payement_Validation.facture')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Payement_Validation.service')),
            ],
        ),
    ]
