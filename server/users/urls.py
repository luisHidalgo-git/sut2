from django.urls import path
from . import views

urlpatterns = [
    path('register/student/', views.register_student, name='register-student'),
    path('register/company/', views.register_company, name='register-company'),
    path('login/', views.login, name='login'),
]