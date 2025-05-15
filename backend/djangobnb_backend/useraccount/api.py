from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import User
from .serializers import UserDetailSerializer

from property.serializers import ReservationsListSerializer

from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status  # This import was missing or not properly recognized
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from django.shortcuts import get_object_or_404

User = get_user_model()


@api_view(['GET'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def reservations_list(request):
    try:
        reservations = request.user.reservations.all()
        
        print('user', request.user)
        print(reservations)
        
        serializer = ReservationsListSerializer(reservations, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])

# def reservations_list(request):
#     reservations = request.user.reservations.all()

#     print('user', request.user)
#     print(reservations)
    
#     serializer = ReservationsListSerializer(reservations, many=True)
#     return JsonResponse(serializer.data, safe=False)





@api_view(['GET'])
@authentication_classes([])  # You can update these as needed
@permission_classes([])      # You can update these as needed
def landlord_detail(request, pk):
    try:
        print(f"Looking for user with pk: {pk}")
        user = User.objects.get(pk=pk)
        serializer = UserDetailSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        print(f"User with pk {pk} not found")
        return Response(
            {"detail": f"No User matches the given query. ID: {pk}"}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return Response(
            {"detail": "An error occurred while processing the request."}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
# @api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
# def landlord_detail(request, pk):
#     user = User.objects.get(pk=pk)

#     serializer = UserDetailSerializer(user, many=False)

#     return JsonResponse(serializer.data, safe=False)

