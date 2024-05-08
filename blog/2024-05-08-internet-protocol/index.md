---
slug: internet-protocol
title: Internet Protocol - IP
authors: [namnguyen]
tags: [networking]
---

### Internet Protocol - IP

The Internet Protocol (IP) is a protocol, or set of rules, for routing and addressing packets of data so that they can travel across networks and arrive at the correct destination

<!--truncate-->

Data traversing the Internet is divided into smaller pieces, called packets.

IP information is attached to each packet, and this information helps routers to send packets to the right place.

Every device or domain that connects to the Internet is assigned an IP address, and as packets are directed to the IP address attached to them, data arrives where it is needed.

Once the packets arrive at their destination, they are handled differently depending on which transport protocol is used in combination with IP. The most common transport protocols are TCP and UDP.

### Transmission Control Protocol - TCP

IP is the primary way in which network connections are made, and it establishes the basis of the Internet. IP does not handle packet ordering or error checking. Such functionality requires another protocol, often the Transmission Control Protocol (TCP).

- The TCP/IP relationship is similar to sending someone a message written on a puzzle through the mail. The message is written down and the puzzle is broken into pieces. Each piece then can travel through a different postal route, some of which take longer than others.
- When the puzzle pieces arrive after traversing their different paths, the pieces may be out of order.
- IP makes sure the pieces arrive at their destination address.
- TCP can be thought of as the puzzle assembler on the other side who puts the pieces together in the right order, asks for missing pieces to be resent, and lets the sender know the puzzle has been received.
- TCP maintains the connection with the sender from before the first puzzle piece is sent to after the final piece is sent.

IP is a connectionless protocol, which means that each unit of data is individually addressed and routed from the source device to the target device, and the target does not send an acknowledgement back to the source. That’s where protocols such as TCP come in. TCP is used in conjunction with IP in order to maintain a connection between the sender and the target and to ensure packet order.

For example, when an email is sent over TCP, a connection is established and a 3-way handshake is made. First, the source sends an SYN “initial request” packet to the target server in order to start the dialogue. Then the target server sends a SYN-ACK packet to agree to the process. Lastly, the source sends an ACK packet to the target to confirm the process, after which the message contents can be sent. The email message is ultimately broken down into packets before each packet is sent out into the Internet, where it traverses a series of gateways before arriving at the target device where the group of packets are reassembled by TCP into the original contents of the email.

![TCP](/img/20240508/TCP-gif.gif)

### User Datagram Protocol - UDP

The User Datagram Protocol, or UDP, is a communication protocol used across the Internet for especially time-sensitive transmissions such as video playback or DNS lookups.

It speeds up communications by not formally establishing a connection before data is transferred.

This allows data to be transferred very quickly, but it can also cause packets to become lost in transit — and create opportunities for exploitation in the form of DDoS attacks.

#### How does UDP work?

Like all networking protocols, UDP is a standardized method for transferring data between two computers in a network.

Compared to other protocols, UDP accomplishes this process in a simple fashion: it sends packets (units of data transmission) directly to a target computer, without establishing a connection first, indicating the order of said packets, or checking whether they arrived as intended. (UDP packets are referred to as ‘datagrams’.)

![UDP](/img/20240508/UDP-gif.gif)

#### When to use UDP?

UDP is commonly used in time-sensitive communications where occasionally dropping packets is better than waiting. Voice and video traffic are often sent using this protocol because they are both time-sensitive and designed to handle some level of loss. For example, VoIP (voice over IP), which is used by many Internet-based telephone services, typically operates over UDP. This is because a static-y phone conversation is preferable to one that is crystal clear but heavily delayed.

This also makes UDP the ideal protocol for online gaming. Similarly, because DNS servers both need to be fast and efficient, they operate through UDP as well.
