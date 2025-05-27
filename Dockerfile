FROM python:3.7-slim

WORKDIR /app
COPY Flask.py /app/
RUN pip3 install flask
RUN mkdir /app/logs
EXPOSE 5200
CMD ["sh", "-c", "python3 Flask.py > /app/logs/flask.log 2>&1"]
