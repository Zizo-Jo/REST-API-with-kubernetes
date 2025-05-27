FROM python:3.7-slim

WORKDIR /app

COPY app.py /app/
COPY templates/ /app/templates/
COPY static/ /app/static/

RUN pip3 install flask
RUN mkdir /app/logs

EXPOSE 5200

CMD ["sh", "-c", "python3 app.py > /app/logs/app.log 2>&1"]
