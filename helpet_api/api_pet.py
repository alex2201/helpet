from rest_framework.response import Response
from rest_framework.views import APIView

from helpet_api.models import *
from rest_framework import viewsets, permissions, generics, authentication

from .serializer_pet import *


class PetList(generics.ListAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return CatPet.objects.filter(username_id=username)


class PetCarnet(generics.RetrieveAPIView):
    serializer_class = PetDataSerializer
    queryset = PetData.objects.all()


class RegisterPet(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        species_id = data['species']
        species = CatPetSpecies.objects.filter(species_id=species_id)[0]
        pet = CatPet(pet_id=None, species=species, gender_id=data['gender'], username_id=data['username'])
        pet.save()
        pet_data = PetData(pet_name=data['pet_name'], born_date=data['born_date'], pet_id=pet)
        pet_data.save()

        return Response(status=201)
