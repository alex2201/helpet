# Generated by Django 2.2 on 2019-05-18 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helpet_api', '0002_petappointment_petdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='uservetdata',
            name='profile_img',
            field=models.CharField(max_length=512, null=True),
        ),
    ]
