from django.db import models
from django.db.models.deletion import CASCADE


class CatUserVet(models.Model):
    username = models.CharField(primary_key=True, max_length=64)
    password = models.CharField(max_length=120)
    is_active = models.BooleanField(default=True)
    is_open = models.BooleanField(default=False)


class UserVetData(models.Model):
    vet_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    profile_img = models.CharField(max_length=512, null=True)
    username = models.ForeignKey(
        CatUserVet,
        on_delete=CASCADE
    )


class CatUserOwner(models.Model):
    username = models.CharField(primary_key=True, max_length=64)
    password = models.CharField(max_length=120)
    is_active = models.BooleanField(default=True)


class UserOwnerData(models.Model):
    name = models.CharField(max_length=100)
    first_last_name = models.CharField(max_length=50)
    second_last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    profile_img = models.CharField(max_length=512, null=True)
    username = models.OneToOneField(
        CatUserOwner,
        on_delete=CASCADE,
        primary_key=True
        # todo on update
    )


class CatPetSpecies(models.Model):
    species_id = models.CharField(max_length=3, primary_key=True)
    species_desc = models.CharField(max_length=16)


class CatPetGender(models.Model):
    gender_id = models.CharField(max_length=3, primary_key=True)
    gender_desc = models.CharField(max_length=16)


class CatPet(models.Model):
    pet_id = models.AutoField(primary_key=True)
    species = models.ForeignKey(
        CatPetSpecies,
        on_delete=CASCADE
    )
    gender = models.ForeignKey(
        CatPetGender,
        on_delete=CASCADE
    )
    username = models.ForeignKey(
        CatUserOwner,
        on_delete=CASCADE
        # todo on update
    )


class PetData(models.Model):
    pet_name = models.CharField(max_length=32)
    born_date = models.DateField()
    parvovirus_1 = models.BooleanField(default=False, null=False)
    parvovirus_2 = models.BooleanField(default=False, null=False)
    parvovirus_3 = models.BooleanField(default=False, null=False)
    moquillo = models.BooleanField(default=False, null=False)
    adenovirus_type_2 = models.BooleanField(default=False, null=False)
    hepatitis_infecciosa_c = models.BooleanField(default=False, null=False)
    leptospirosis = models.BooleanField(default=False, null=False)
    coronavirus = models.BooleanField(default=False, null=False)
    rabia = models.BooleanField(default=False, null=False)
    parainfluenza = models.BooleanField(default=False, null=False)
    pet_id = models.OneToOneField(
        CatPet,
        on_delete=CASCADE,
        primary_key=True
    )


class PetAppointment(models.Model):
    date_id = models.DateTimeField(auto_now=True)
    symptoms = models.CharField(max_length=8000)
    diagnostic = models.CharField(max_length=8000)
    pet_id = models.ForeignKey(
        'CatPet',
        on_delete=CASCADE
        # todo on update
    )
    vet_id = models.ForeignKey(
        'CatUserVet',
        on_delete=CASCADE
        # todo on update
    )

    PET_APPOINTMENT_STATUS_CHOICES = (
        ('A', 'ACTIVE'),
        ('C', 'CANCELED'),
        ('P', 'PENDENT'),
    )

    status = models.CharField(max_length=1, choices=PET_APPOINTMENT_STATUS_CHOICES, default='P')
