# Generated by Django 5.0.3 on 2024-03-25 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Data_Collection', '0002_remove_juridicaltext_official_journal_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adjutstement',
            name='adjusted_num',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='adjutstement',
            name='adjusting_num',
            field=models.CharField(max_length=100),
        ),
    ]
