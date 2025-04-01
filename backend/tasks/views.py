from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task, CalendarEvent
from .serializers import TaskSerializer, CalendarEventSerializer
from django.utils import timezone
from datetime import datetime, timedelta

# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['completed', 'priority', 'category']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'priority']
    ordering = ['-created_at']

    @action(detail=False, methods=['post'])
    def bulk_delete(self, request):
        ids = request.data.get('ids', [])
        Task.objects.filter(id__in=ids).delete()
        return Response({'status': 'success'})

class CalendarEventViewSet(viewsets.ModelViewSet):
    queryset = CalendarEvent.objects.all()
    serializer_class = CalendarEventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['recurrence']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_time', 'end_time', 'created_at']
    ordering = ['start_time']

    def get_queryset(self):
        queryset = CalendarEvent.objects.all()
        start = self.request.query_params.get('start', None)
        end = self.request.query_params.get('end', None)

        if start is not None and end is not None:
            try:
                start_date = datetime.fromisoformat(start.replace('Z', '+00:00'))
                end_date = datetime.fromisoformat(end.replace('Z', '+00:00'))
                queryset = queryset.filter(
                    start_time__lte=end_date,
                    end_time__gte=start_date
                )
            except ValueError:
                pass

        return queryset

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        now = timezone.now()
        next_week = now + timedelta(days=7)
        events = self.get_queryset().filter(
            start_time__gte=now,
            start_time__lte=next_week
        ).order_by('start_time')
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def bulk_delete(self, request):
        ids = request.data.get('ids', [])
        CalendarEvent.objects.filter(id__in=ids).delete()
        return Response({'status': 'success'})

    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        event = self.get_object()
        new_event = CalendarEvent.objects.create(
            title=f"Copy of {event.title}",
            description=event.description,
            start_time=event.start_time,
            end_time=event.end_time,
            location=event.location,
            color=event.color,
            recurrence=event.recurrence,
            task=event.task
        )
        serializer = self.get_serializer(new_event)
        return Response(serializer.data)
