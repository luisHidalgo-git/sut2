from django.urls import path
from . import views

urlpatterns = [
    path('register/student/', views.register_student, name='register-student'),
    path('register/company/', views.register_company, name='register-company'),
    path('login/', views.login, name='login'),
    path('user/', views.get_user_info, name='user-info'),
    path('users/', views.get_users, name='get-users'),
    path('companies/', views.get_companies, name='get-companies'),
    path('students/', views.get_students, name='get-students'),
    path('dashboard/stats/', views.get_dashboard_stats, name='dashboard-stats'),
]