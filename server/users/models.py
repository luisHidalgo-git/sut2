from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('student', 'Student'),
        ('company', 'Company'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    email = models.EmailField(unique=True)

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    career = models.CharField(max_length=100)
    semester = models.IntegerField()

class CompanyProfile(models.Model):
    COMPANY_SIZE_CHOICES = (
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_size = models.CharField(max_length=10, choices=COMPANY_SIZE_CHOICES)
    industry = models.CharField(max_length=100)
    website = models.URLField()