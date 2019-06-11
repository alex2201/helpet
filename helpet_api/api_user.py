from rest_framework.response import Response
from rest_framework.views import APIView

from helpet_api.models import *
from rest_framework import viewsets, permissions, generics

from .serializer_user import *


class UserOwnerViewSet(viewsets.ModelViewSet):
    queryset = CatUserOwner.objects.all()
    serializer_class = UserOwnerSerializer
    permission_classes = [
        # permissions.IsAuthenticated,
        permissions.AllowAny,
    ]


class UserOwnerDataViewSet(viewsets.ModelViewSet):
    queryset = UserOwnerData.objects.all()
    serializer_class = UserOwnerDataSerializer
    permission_classes = [
        # permissions.IsAuthenticated,
        permissions.AllowAny,
    ]


class UserVetViewSet(viewsets.ModelViewSet):
    queryset = CatUserVet.objects.all()

    permission_classes = [
        # permissions.IsAuthenticated,
        permissions.AllowAny,
    ]

    serializer_class = UserVetSerializer


class UserOwnerLogin(generics.ListAPIView):
    serializer_class = UserOwnerSerializer

    def get_queryset(self):
        # todo refactor to logged user
        username = self.kwargs['username']
        password = self.kwargs['password']
        user = CatUserOwner.objects.filter(username=username, password=password)

        return CatUserOwner.objects.filter(username=username, password=password)


class UserVetLogin(generics.ListAPIView):
    serializer_class = UserVetSerializer

    def get_queryset(self):
        # todo refactor to logged user
        username = self.kwargs['username']
        password = self.kwargs['password']
        return CatUserVet.objects.filter(username=username, password=password)


class RegisterUserOwner(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        user = CatUserOwner(username=data['username'], password=data['password'])
        user.save()
        user_data = UserOwnerData(name='nombre', first_last_name='app', second_last_name='apm', phone_number='99999999',
                                  address='-',
                                  profile_img=None, username_id=data['username'])
        user_data.save()

        return Response(status=201)


class RegisterUserVet(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        user = CatUserVet(username=data['username'], password=data['password'], is_open=1)
        user.save()
        user_data = UserVetData(vet_name='nombre', phone_number='99999999', address='calle 123, Col. Lomasbajas, Del. Iztacalco', profile_img=None,
                                username_id=data['username'])
        user_data.save()

        return Response(status=201)
