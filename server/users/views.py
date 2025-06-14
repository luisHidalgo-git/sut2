from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    StudentRegistrationSerializer, 
    CompanyRegistrationSerializer, 
    LoginSerializer,
    UserSerializer
)
from .models import User, StudentProfile, CompanyProfile

@api_view(['POST'])
def register_student(request):
    serializer = StudentRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_company(request):
    serializer = CompanyRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = User.objects.get(email=serializer.validated_data['email'])
            if user.check_password(serializer.validated_data['password']):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_type': user.user_type
                })
        except User.DoesNotExist:
            pass
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    # Exclude current user and get other users
    users = User.objects.exclude(id=request.user.id)
    
    # Filter by user type if specified
    user_type = request.GET.get('type')
    if user_type in ['student', 'company']:
        users = users.filter(user_type=user_type)
    
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_companies(request):
    companies = User.objects.filter(user_type='company')
    company_data = []
    
    for company in companies:
        try:
            profile = company.companyprofile
            company_data.append({
                'id': company.id,
                'name': company.username,
                'industry': profile.industry,
                'size': profile.get_company_size_display(),
                'website': profile.website
            })
        except CompanyProfile.DoesNotExist:
            continue
    
    return Response(company_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_students(request):
    students = User.objects.filter(user_type='student').exclude(id=request.user.id)
    student_data = []
    
    for student in students:
        try:
            profile = student.studentprofile
            student_data.append({
                'id': student.id,
                'name': f"{student.first_name} {student.last_name}".strip() or student.username,
                'field': profile.career,
                'semester': profile.semester
            })
        except StudentProfile.DoesNotExist:
            student_data.append({
                'id': student.id,
                'name': f"{student.first_name} {student.last_name}".strip() or student.username,
                'field': 'No especificado',
                'semester': 0
            })
    
    return Response(student_data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_dashboard_stats(request):
    user = request.user
    
    # Import Post model from posts app
    from posts.models import Post
    
    # Get user's posts count
    user_posts_count = Post.objects.filter(author=user).count()
    
    # Get connections count (this would be implemented when connection feature is added)
    connections_count = 0
    
    # Get profile views (mock data for now)
    profile_views = 127
    
    return Response({
        'posts_count': user_posts_count,
        'connections_count': connections_count,
        'profile_views': profile_views
    })