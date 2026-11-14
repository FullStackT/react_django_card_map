from django.urls import path
from .views import (
    get_cards,
    create_card,
    card_detail,
    get_books,
    create_book,
    book_detail,
    get_bills,
    create_bill,
    bill_detail,
)

urlpatterns = [
    path('bills/', get_bills, name='get_bills'),
    path('bills/create/', create_bill, name='create_bill'),
    path('bills/<int:pk>', bill_detail, name='bill_detail'),
    path('books/', get_books, name='get_books'),
    path('books/create/', create_book, name='create_book'),
    path('books/<int:pk>', book_detail, name='book_detail'),
    path('cards/', get_cards, name='get_cards'),
    path('cards/create/', create_card, name='create_card'),
    path('cards/<int:pk>', card_detail, name='card_detail'),
]