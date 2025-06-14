from django.urls import path
from . import views

app_name = 'posts'

urlpatterns = [
    path('', views.get_posts, name='get-posts'),
    path('create/', views.create_post, name='create-post'),
    path('<int:post_id>/like/', views.toggle_like, name='toggle-like'),
    path('<int:post_id>/comments/', views.get_post_comments, name='get-post-comments'),
    path('<int:post_id>/comments/create/', views.create_comment, name='create-comment'),
    path('user/<int:user_id>/', views.get_user_posts, name='get-user-posts'),
    path('my-posts/', views.get_user_posts, name='get-my-posts'),
]