from rest_framework import serializers
from .models import User, StudentProfile, CompanyProfile

class StudentRegistrationSerializer(serializers.ModelSerializer):
    student_id = serializers.CharField()
    career = serializers.CharField()
    semester = serializers.IntegerField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'student_id', 'career', 'semester']

    def create(self, validated_data):
        profile_data = {
            'student_id': validated_data.pop('student_id'),
            'career': validated_data.pop('career'),
            'semester': validated_data.pop('semester'),
        }
        validated_data['user_type'] = 'student'
        user = User.objects.create_user(**validated_data)
        StudentProfile.objects.create(user=user, **profile_data)
        return user

class CompanyRegistrationSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField()
    industry = serializers.CharField()
    website = serializers.URLField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'company_name', 'industry', 'website']

    def create(self, validated_data):
        profile_data = {
            'company_name': validated_data.pop('company_name'),
            'industry': validated_data.pop('industry'),
            'website': validated_data.pop('website'),
        }
        validated_data['user_type'] = 'company'
        user = User.objects.create_user(**validated_data)
        CompanyProfile.objects.create(user=user, **profile_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()