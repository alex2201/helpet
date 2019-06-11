from rest_framework import serializers
from helpet_api.models import *
from helpet_api.serializer_pet import PetSerializer


class UserOwnerDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOwnerData
        fields = (
            'username_id',
            'name',
            'first_last_name',
            'second_last_name',
            'phone_number',
            'address',
            'profile_img',
        )


class UserOwnerSerializer(serializers.ModelSerializer):
    userownerdata = UserOwnerDataSerializer()
    pets = PetSerializer(many=True, source='catpet_set')

    class Meta:
        model = CatUserOwner
        fields = (
            'username',
            'password',
            'is_active',
            'userownerdata',
            'pets',
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'userownerdata': {'read_only': True},
        }


class UserVetDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVetData
        fields = (
            'name',
            'phone_number',
            'address',
            'profile_img',
        )


class UserVetSerializer(serializers.ModelSerializer):

    class Meta:
        model = CatUserVet
        fields = (
            'username',
            'password',
            'is_active',
            # 'uservetdata',
        )

        extra_kwargs = {
            'password': {'write_only': True},
            # 'uservetdata': {'read_only': True}
        }
