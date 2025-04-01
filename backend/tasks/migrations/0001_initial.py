# Generated by Django 4.2.7 on 2025-03-30 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('completed', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('due_date', models.DateTimeField(blank=True, null=True)),
                ('priority', models.CharField(choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], default='medium', max_length=10)),
                ('category', models.CharField(choices=[('homework', 'Homework'), ('projects', 'Projects'), ('exams', 'Exams'), ('personal', 'Personal')], default='personal', max_length=20)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
