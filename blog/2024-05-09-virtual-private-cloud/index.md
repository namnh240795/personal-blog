---
slug: aws-virtual-private-cloud
title: AWS Virtual Private Cloud - AWS VPC
authors: [namnguyen]
tags: [networking, aws]
---

## Amazon Virtual Private Cloud

Amazon Virtual Private Cloud (VPC) is a service that lets you launch AWS resources in a logically isolated virtual network that you define.

You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.

You can use both IPv4 and IPv6 for most resources in your VPC, helping to ensure secure and easy access to resources and applications.

<!--truncate-->

### Amazon VPC features

- Amazon Virtual Private Cloud (VPC) is a service that lets you launch AWS resources in a logically isolated virtual network that you define.
- You have complete control over your virtual networking environment, including selection of your own IP address range, creation of subnets, and configuration of route tables and network gateways.
- You can use both IPv4 and IPv6 for most resources in your VPC, helping to ensure secure and easy access to resources and applications. As one of AWS's foundational services, Amazon VPC makes it easy to customize your VPC's network configuration.
- You can create a public-facing subnet for your web servers that have access to the internet. It also lets you place your backend systems, such as databases or application servers, in a private-facing subnet with no internet access.
- Amazon VPC lets you to use multiple layers of security, including security groups and network access control lists, to help control access to Amazon Elastic Compute Cloud (Amazon EC2) instances in each subnet.

### Flow Logs

- You can monitor your VPC flow logs delivered to Amazon Simple Storage Service (Amazon S3) or Amazon CloudWatch to gain operational visibility into your network dependencies and traffic patterns, detect anomalies and prevent data leakage, and troubleshoot network connectivity and configuration issues.

- The enriched metadata in flow logs helps you learn more about who initiated your TCP connections and the packet-level source and destination for traffic flowing through intermediate layers (such as a NAT gateway).

### IP Address Manager (IPAM)

- IPAM makes it easier for you to plan, track, and monitor IP addresses for your AWS workloads.
- IPAM automates IP address assignments to your Amazon VPC, removing the need to use homegrown or spreadsheet-based planning applications.
- It also enhances your network observability by showing IP usage across multiple accounts and VPCs in a unified operational view.

### IP Addressing

- IP addresses enable resources in your VPC to communicate with each other and with resources over the internet. Amazon VPC supports both the IPv4 and IPv6 addressing protocols.
- In a VPC, you can create IPv4-only, dual-stack, and IPv6-only subnets and launch Amazon EC2 instances in these subnets.
- Amazon also gives you multiple options to assign public IP addresses to your instances. You can use the Amazon provided public IPv4 addresses, Elastic IPv4 addresses, or an IP address from the Amazon provided IPv6 CIDRs.
- Apart from this, you have the option to bring your own IPv4 or IPv6 addresses within the Amazon VPC that can be assigned to these instances

### Ingress Routing

- With this feature, you can route all incoming and outgoing traffic flowing to/from an internet gateway or virtual private gateway to a specific Amazon EC2 instance’s elastic network interface.
- Configure your virtual private cloud to send all traffic to a gateway or an Amazon EC2 instance before it reaches your business workloads.

### Network Access Control List

- A network access control list (network ACL) is an optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets.
- You might set up network ACLs with rules similar to those of your security groups.

### Security Groups

- Create security groups to act as a firewall for associated Amazon EC2 instances, controlling inbound and outbound traffic at the instance level.
- When you launch an instance, you can associate it with one or more security groups.
- If you don’t specify a group, the instance is automatically associated with the VPC’s default group.
- Each instance in your VPC can belong to a different set of groups.
