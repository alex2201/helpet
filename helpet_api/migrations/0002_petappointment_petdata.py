# Generated by Django 2.2 on 2019-05-17 06:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('helpet_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PetData',
            fields=[
                ('pet_name', models.CharField(max_length=32)),
                ('born_date', models.DateField()),
                ('parvovirus_1', models.BooleanField(default=False)),
                ('parvovirus_2', models.BooleanField(default=False)),
                ('parvovirus_3', models.BooleanField(default=False)),
                ('moquillo', models.BooleanField(default=False)),
                ('adenovirus_type_2', models.BooleanField(default=False)),
                ('hepatitis_infecciosa_c', models.BooleanField(default=False)),
                ('leptospirosis', models.BooleanField(default=False)),
                ('coronavirus', models.BooleanField(default=False)),
                ('rabia', models.BooleanField(default=False)),
                ('parainfluenza', models.BooleanField(default=False)),
                ('pet_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='helpet_api.CatPet')),
            ],
        ),
        migrations.CreateModel(
            name='PetAppointment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_id', models.DateTimeField(auto_now=True)),
                ('symptoms', models.CharField(max_length=8000)),
                ('diagnostic', models.CharField(max_length=8000)),
                ('status', models.CharField(choices=[('A', 'ACTIVE'), ('C', 'CANCELED'), ('P', 'PENDENT')], default='P', max_length=1)),
                ('pet_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpet_api.CatPet')),
                ('vet_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='helpet_api.CatUserVet')),
            ],
        ),
    ]