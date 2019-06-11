from rest_framework import serializers
from helpet_api.models import *


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatPetSpecies
        fields = (
            'species_desc'
        )
        extra_kwargs = {
            'species_desc': {'read_only': True},
        }


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatPetGender
        fields = (
            'gender_desc'
        )
        extra_kwargs = {
            'gender_desc': {'read_only': True},
        }


class PetDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetData
        fields = '__all__'


class PetSerializer(serializers.ModelSerializer):
    species = serializers.CharField(source='species.species_desc')
    gender = serializers.CharField(source='gender.gender_desc')
    pet_name = serializers.CharField(source='petdata.pet_name')
    born_date = serializers.CharField(source='petdata.born_date')

    class Meta:
        model = CatPet
        fields = (
            'pet_id',
            'species',
            'gender',
            'born_date',
            'pet_name',
        )
        extra_kwargs = {
            'pet_id': {'read_only': True},
            'species': {'read_only': True},
            'gender': {'read_only': True},
        }
