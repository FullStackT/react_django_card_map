from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Bill, Book, Card
from .serializer import BillSerializer, BookSerializer, CardSerializer

# Bills
@api_view(['GET'])
def get_bills(request):
    bills = Bill.objects.all()
    serializedData = BillSerializer(bills, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_bill(request):
    data = request.data
    serializer = BillSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def bill_detail(request, pk):
    try:
        bill = Bill.objects.get(pk=pk)
    except Bill.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        bill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        data = request.data
        # Different from create_book() in that we pass 'book' to BookSerializer to
        # show we aren't creating a new book, we already have one...so we're updating
        serializer = BillSerializer(bill, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Books
@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializedData = BookSerializer(books, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_book(request):
    data = request.data
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        data = request.data
        # Different from create_book() in that we pass 'book' to BookSerializer to
        # show we aren't creating a new book, we already have one...so we're updating
        serializer = BookSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Cards
@api_view(['GET'])
def get_cards(request):
    cards = Card.objects.all()
    serializedData = CardSerializer(cards, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_card(request):
    data = request.data
    serializer = CardSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def card_detail(request, pk):
    try:
        card = Card.objects.get(pk=pk)
    except Card.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        data = request.data
        # Different from create_book() in that we pass 'book' to BookSerializer to
        # show we aren't creating a new book, we already have one...so we're updating
        serializer = CardSerializer(card, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)