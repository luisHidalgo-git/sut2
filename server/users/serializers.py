from rest_framework import serializers
from .models import User, StudentProfile, CompanyProfile

class StudentRegistrationSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    career = serializers.CharField()
    semester = serializers.IntegerField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'career', 'semester']

    def create(self, validated_data):
        profile_data = {
            'career': validated_data.pop('career'),
            'semester': validated_data.pop('semester'),
        }
        validated_data['user_type'] = 'student'
        user = User.objects.create_user(**validated_data)
        StudentProfile.objects.create(user=user, **profile_data)
        return user

class CompanyRegistrationSerializer(serializers.ModelSerializer):
    company_size = serializers.ChoiceField(choices=CompanyProfile.COMPANY_SIZE_CHOICES)
    industry = serializers.CharField()
    website = serializers.URLField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'company_size', 'industry', 'website']

    def create(self, validated_data):
        profile_data = {
            'company_size': validated_data.pop('company_size'),
            'industry': validated_data.pop('industry'),
            'website': validated_data.pop('website'),
        }
        validated_data['user_type'] = 'company'
        user = User.objects.create_user(**validated_data)
        CompanyProfile.objects.create(user=user, **profile_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    profile_info = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'user_type', 'profile_info']

    def get_profile_info(self, obj):
        if obj.user_type == 'student':
            try:
                profile = obj.studentprofile
                return {
                    'career': profile.career,
                    'semester': profile.semester
                }
            except StudentProfile.DoesNotExist:
                return {}
        elif obj.user_type == 'company':
            try:
                profile = obj.companyprofile
                return {
                    'company_size': profile.company_size,
                    'industry': profile.industry,
                    'website': profile.website
                }
            except CompanyProfile.DoesNotExist:
                return {}
        return {}