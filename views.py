from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required


def portfolio(request):
    context = {
        'title': 'Portfolio Home'
    }
    return render(request, "user_profile/index.html", context)


def logout_view(request):
    logout(request)
    return redirect("login")
