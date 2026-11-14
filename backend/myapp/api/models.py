from django.db import models
from django.core.validators import RegexValidator

class Bill(models.Model):
    company = models.CharField(max_length=50)
    card = models.ForeignKey(to="Card", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.company)

class Book(models.Model):
    title = models.CharField(max_length=50)
    release_year = models.IntegerField()

    def __str__(self):
        return str(self.title)

class Card(models.Model):
    last_four = models.CharField(
        max_length=4,
        validators=[
            RegexValidator(
                regex=r'^\d{4}$',
                message='Must be exactly 4 digits.'
            )
        ]
    )
    owner = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.owner} (*{self.last_four})"
