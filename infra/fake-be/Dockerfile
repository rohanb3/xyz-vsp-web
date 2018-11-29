FROM node:6
COPY run-fake-be.sh /run-fake-be.sh
COPY fake-be /fake-be
RUN npm install express body-parser --unsafe-perm
RUN chmod +x /run-fake-be.sh
CMD ["/run-fake-be.sh"]
