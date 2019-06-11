from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os


class ReactAppView(View):

    def get(self, request):
        try:
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

            with open(os.path.join(os.path.join(BASE_DIR, 'helpet_frontend'), 'build', 'index.html'), encoding="utf-8") as file:
                return HttpResponse(file.read())

        except:
            return HttpResponse(
                """
                index.html not found ! build your React app !!
                """,
                status=501,
            )
