FROM python:alpine

RUN apk update && apk add --no-cache gcc \
    musl-dev \
    libffi-dev

COPY ./app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY ./app /app

COPY ./flag /flag

CMD ["python3", "app.py" ]