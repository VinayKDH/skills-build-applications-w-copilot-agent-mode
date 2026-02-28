from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='pass', first_name='Tony', last_name='Stark')
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='pass', first_name='Bruce', last_name='Wayne')
        wonderwoman = User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='pass', first_name='Diana', last_name='Prince')
        spiderman = User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='pass', first_name='Peter', last_name='Parker')

        # Create activities
        Activity.objects.create(user='ironman', type='Running', duration=30)
        Activity.objects.create(user='batman', type='Cycling', duration=45)
        Activity.objects.create(user='wonderwoman', type='Swimming', duration=60)
        Activity.objects.create(user='spiderman', type='Yoga', duration=20)

        # Create leaderboard
        Leaderboard.objects.create(team='Marvel', points=50)
        Leaderboard.objects.create(team='DC', points=40)

        # Create workouts
        Workout.objects.create(name='HIIT', difficulty='Hard')
        Workout.objects.create(name='Cardio', difficulty='Medium')
        Workout.objects.create(name='Strength', difficulty='Hard')
        Workout.objects.create(name='Yoga', difficulty='Easy')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
