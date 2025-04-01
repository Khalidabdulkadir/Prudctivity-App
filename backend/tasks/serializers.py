from rest_framework import serializers
from .models import Task, CalendarEvent

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class CalendarEventSerializer(serializers.ModelSerializer):
    task_title = serializers.CharField(source='task.title', read_only=True)

    class Meta:
        model = CalendarEvent
        fields = '__all__'

    def validate(self, data):
        if data['start_time'] > data['end_time']:
            raise serializers.ValidationError("End time must be after start time")
        return data
