---
slug: route-table
title: Route Table - AWS VPC
authors: [namnguyen]
tags: [networking, aws, route-table]
---

### Route Table

A route table contains a set of rules, called routes, that determine where network traffic from your subnet or gateway is directed.

<!--truncate-->

### Route table concepts

The following are the key concepts for route tables.

- **Main route table** — The route table that automatically comes with your VPC. It controls the routing for all subnets that are not explicitly associated with any other route table.

- **Custom route table** — A route table that you create for your VPC.

- **Destination** — The range of IP addresses where you want traffic to go (destination CIDR). For example, an external corporate network with the CIDR 172.16.0.0/12.

- **Target** — The gateway, network interface, or connection through which to send the destination traffic; for example, an internet gateway.

- **Route table association** — The association between a route table and a subnet, internet gateway, or virtual private gateway.

- **Subnet route table** — A route table that's associated with a subnet.

- **Local route** — A default route for communication within the VPC.

- **Propagation** — If you've attached a virtual private gateway to your VPC and enable route propagation, we automatically add routes for your VPN connection to your subnet route tables. This means that you don't need to manually add or remove VPN routes. For more information, see Site-to-Site VPN routing options in the Site-to-Site VPN User Guide.

- **Gateway route table** — A route table that's associated with an internet gateway or virtual private gateway.

- **Edge association** — A route table that you use to route inbound VPC traffic to an appliance. You associate a route table with the internet gateway or virtual private gateway, and specify the network interface of your appliance as the target for VPC traffic.

- **Transit gateway route table** — A route table that's associated with a transit gateway. For more information, see Transit gateway route tables in Amazon VPC Transit Gateways.

- **Local gateway route table** — A route table that's associated with an Outposts local gateway. For more information, see Local gateways in the AWS Outposts User Guide.

### Subnet route tables

Your VPC has an implicit router, and you use route tables to control where network traffic is directed. Each subnet in your VPC must be associated with a route table, which controls the routing for the subnet (subnet route table). You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table. A subnet can only be associated with one route table at a time, but you can associate multiple subnets with the same subnet route table.

#### Routes

Each route in a table specifies a destination and a target. For example, to enable your subnet to access the internet through an internet gateway, add the following route to your subnet route table. The destination for the route is 0.0.0.0/0, which represents all IPv4 addresses. The target is the internet gateway that's attached to your VPC.

| Destination | Target              |
| :---------: | :------------------ |
|  0.0.0.0/0  | internet-gateway-id |

CIDR blocks for IPv4 and IPv6 are treated separately. For example, a route with a destination CIDR of 0.0.0.0/0 does not automatically include all IPv6 addresses. You must create a route with a destination CIDR of ::/0 for all IPv6 addresses.

If you frequently reference the same set of CIDR blocks across your AWS resources, you can create a customer-managed prefix list to group them together. You can then specify the prefix list as the destination in your route table entry.

Every route table contains a local route for communication within the VPC. This route is added by default to all route tables. If your VPC has more than one IPv4 CIDR block, your route tables contain a local route for each IPv4 CIDR block. If you've associated an IPv6 CIDR block with your VPC, your route tables contain a local route for the IPv6 CIDR block. You can replace or restore the target of each local route as needed.

##### Rules and Considerations

- You can add a route to your route tables that is more specific than the local route. The destination must match the entire IPv4 or IPv6 CIDR block of a subnet in your VPC. The target must be a NAT gateway, network interface, or Gateway Load Balancer endpoint.

- If your route table has multiple routes, we use the most specific route that matches the traffic (longest prefix match) to determine how to route the traffic.

- You can't add routes to IPv4 addresses that are an exact match or a subset of the following range: 169.254.168.0/22. This range is within the link-local address space and is reserved for use by AWS services. For example, Amazon EC2 uses addresses in this range for services that are accessible only from EC2 instances, such as the Instance Metadata Service (IMDS) and the Amazon DNS server. You can use a CIDR block that is larger than but overlaps 169.254.168.0/22, but packets destined for addresses in 169.254.168.0/22 will not be forwarded.

- You can't add routes to IPv6 addresses that are an exact match or a subset of the following range: fd00:ec2::/32. This range is within the unique local address (ULA) space and is reserved for use by AWS services. For example, Amazon EC2 uses addresses in this range for services that are accessible only from EC2 instances, such as the Instance Metadata Service (IMDS) and the Amazon DNS server. You can use a CIDR block that is larger than but overlaps fd00:ec2::/32, but packets destined for addresses in fd00:ec2::/32 will not be forwarded.

- You can add middlebox appliances to the routing paths for your VPC.

##### Example

In the following example, suppose that the VPC has both an IPv4 CIDR block and an IPv6 CIDR block. IPv4 and IPv6 traffic are treated separately, as shown in the following route table.

|       Destination       | Target                       |
| :---------------------: | :--------------------------- |
|       10.0.0.0/16       | Local                        |
| 2001:db8:1234:1a00::/56 | Local                        |
|      172.31.0.0/16      | Peering Connection           |
|        0.0.0.0/0        | Internet Gateway             |
|          ::/0           | Egress only Internet Gateway |

- IPv4 traffic to be routed within the VPC (10.0.0.0/16) is covered by the Local route.

- IPv6 traffic to be routed within the VPC (2001:db8:1234:1a00::/56) is covered by the Local route.

- The route for 172.31.0.0/16 sends traffic to a peering connection.

- The route for all IPv4 traffic (0.0.0.0/0) sends traffic to an internet gateway. Therefore, all IPv4 traffic, except for traffic within the VPC and to the peering connection, is routed to the internet gateway.

- The route for all IPv6 traffic (::/0) sends traffic to an egress-only internet gateway. Therefore, all IPv6 traffic, except for traffic within the VPC, is routed to the egress-only internet gateway.

#### Main Route Table

When you create a VPC, it automatically has a main route table. When a subnet does not have an explicit routing table associated with it, the main routing table is used by default. On the Route tables page in the Amazon VPC console, you can view the main route table for a VPC by looking for Yes in the Main column.

By default, when you create a nondefault VPC, the main route table contains only a local route. If you Create a VPC and choose a NAT gateway, Amazon VPC automatically adds routes to the main route table for the gateways.

The following rules apply to the main route table:

- You can add, remove, and modify routes in the main route table.

- You can't delete the main route table.

- You can't set a gateway route table as the main route table.

- You can replace the main route table by associating a custom route table with a subnet.

- You can explicitly associate a subnet with the main route table, even if it's already implicitly associated.

- You might want to do that if you change which table is the main route table. When you change which table is the main route table, it also changes the default for additional new subnets, or for any subnets that are not explicitly associated with any other route table.

#### Custom route tables

By default, a route table contains a local route for communication within the VPC. If you Create a VPC and choose a public subnet, Amazon VPC creates a custom route table and adds a route that points to the internet gateway. One way to protect your VPC is to leave the main route table in its original default state. Then, explicitly associate each new subnet that you create with one of the custom route tables you've created. This ensures that you explicitly control how each subnet routes traffic.

You can add, remove, and modify routes in a custom route table. You can delete a custom route table only if it has no associations.
