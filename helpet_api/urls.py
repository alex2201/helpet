from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from rest_framework import routers

from helpet_api.api_pet import *
from .api_user import *

router = routers.DefaultRouter()
router.register(r'user/owner', UserOwnerViewSet, 'user_owner')
router.register(r'user/owner/data', UserOwnerDataViewSet, 'user_owner_data')
router.register(r'user/vet', UserVetViewSet, 'user_vet')

urlpatterns = router.urls + [
    url(r'auth/user/owner/(?P<username>.+)/(?P<password>.+)/$', UserOwnerLogin.as_view()),
    url(r'auth/user/vet/(?P<username>.+)/(?P<password>.+)/$', UserVetLogin.as_view()),
    url(r'register/pet/', RegisterPet.as_view()),
    url(r'register/owner/', RegisterUserOwner.as_view()),
    url(r'register/vet/', RegisterUserVet.as_view()),
    url(r'user/owner/pet-list/(?P<username>.+)$', PetList.as_view()),
    url(r'user/owner/pet-data/(?P<pk>.+)$', PetCarnet.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
