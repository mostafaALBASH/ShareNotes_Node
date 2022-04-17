FROM node:16
WORKDIR /oneapp1/sharenotesnode
ADD . /oneapp1/sharenotesnode
ENV NODE_ENV production
RUN npm install
EXPOSE 3000
CMD npm start