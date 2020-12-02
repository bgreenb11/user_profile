from django.shortcuts import render


def portfolio(request):
    return render(request, "user_profile/index.html")
