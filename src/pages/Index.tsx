
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CodeBlock from '@/components/CodeBlock';
import ProjectStructure from '@/components/ProjectStructure';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ExternalLink, FileCode, GitFork, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-spring to-kafka-accent bg-clip-text text-transparent">
              Spring Boot + Kafka + Pact Testing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A demonstration of contract testing with Pact in a Spring Boot application using Kafka for message-based communication
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-spring hover:bg-spring-dark">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                View on GitHub <GitFork className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCode className="mr-2 h-5 w-5 text-spring" />
                  Spring Boot 3.3.1
                </CardTitle>
                <CardDescription>Built with the latest Spring Boot and Java 17</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Modern application framework with autoconfiguration, dependency injection, and embedded server.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-kafka-accent" />
                  Apache Kafka
                </CardTitle>
                <CardDescription>Stream processing for event-driven architecture</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Listen to string messages from Kafka topics with Spring's integration support for asynchronous messaging.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCode className="mr-2 h-5 w-5 text-blue-500" />
                  Pact Testing
                </CardTitle>
                <CardDescription>Consumer-driven contract testing</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Test your consumer and provider interactions independently with Pact to ensure contract compliance.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProjectStructure />
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="application">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="application">Application</TabsTrigger>
                  <TabsTrigger value="kafka">Kafka</TabsTrigger>
                  <TabsTrigger value="pact">Pact</TabsTrigger>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                </TabsList>
                
                <TabsContent value="application">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spring Boot Application</CardTitle>
                      <CardDescription>Main application class with configuration</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock language="java" title="KafkaPactApplication.java">
{`package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KafkaPactApplication {

    public static void main(String[] args) {
        SpringApplication.run(KafkaPactApplication.class, args);
    }
}`}
                      </CodeBlock>
                      
                      <CodeBlock language="java" title="MessageService.java">
{`package com.example.demo.service;

import com.example.demo.model.Message;

public interface MessageService {
    void processMessage(String payload);
    Message convertToMessage(String payload);
}`}
                      </CodeBlock>
                      
                      <CodeBlock language="java" title="MessageServiceImpl.java">
{`package com.example.demo.service;

import com.example.demo.model.Message;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MessageServiceImpl implements MessageService {
    
    private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);
    
    @Override
    public void processMessage(String payload) {
        logger.info("Processing message: {}", payload);
        Message message = convertToMessage(payload);
        // Additional business logic here
    }
    
    @Override
    public Message convertToMessage(String payload) {
        // Simple implementation - would be more complex in a real app
        return new Message(payload);
    }
}`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="kafka">
                  <Card>
                    <CardHeader>
                      <CardTitle>Kafka Integration</CardTitle>
                      <CardDescription>Configuration and listener components</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock language="java" title="KafkaConfig.java">
{`package com.example.demo.config;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${spring.kafka.consumer.group-id}")
    private String groupId;

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }
}`}
                      </CodeBlock>
                      
                      <CodeBlock language="java" title="MessageListener.java">
{`package com.example.demo.listener;

import com.example.demo.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    private static final Logger logger = LoggerFactory.getLogger(MessageListener.class);
    private final MessageService messageService;

    public MessageListener(MessageService messageService) {
        this.messageService = messageService;
    }

    @KafkaListener(topics = "\${app.kafka.topic.name}")
    public void listen(String message) {
        logger.info("Received message: {}", message);
        messageService.processMessage(message);
    }
}`}
                      </CodeBlock>
                      
                      <CodeBlock language="java" title="Message.java">
{`package com.example.demo.model;

import java.time.LocalDateTime;

public class Message {
    private final String content;
    private final LocalDateTime timestamp;

    public Message(String content) {
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        return "Message{" +
                "content='" + content + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pact">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pact Testing</CardTitle>
                      <CardDescription>Consumer and provider contract tests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock language="java" title="MessageConsumerPactTest.java">
{`package com.example.demo.pact.consumer;

import au.com.dius.pact.consumer.MessagePactBuilder;
import au.com.dius.pact.consumer.dsl.PactDslJsonBody;
import au.com.dius.pact.consumer.junit5.PactConsumerTestExt;
import au.com.dius.pact.consumer.junit5.PactTestFor;
import au.com.dius.pact.consumer.junit5.ProviderType;
import au.com.dius.pact.core.model.annotations.Pact;
import au.com.dius.pact.core.model.messaging.MessagePact;
import com.example.demo.model.Message;
import com.example.demo.service.MessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(PactConsumerTestExt.class)
@SpringBootTest
@PactTestFor(providerName = "message-provider", providerType = ProviderType.ASYNCH)
public class MessageConsumerPactTest {

    @Autowired
    private MessageService messageService;
    
    @Autowired
    private ObjectMapper objectMapper;

    @Pact(provider = "message-provider", consumer = "message-consumer")
    public MessagePact createPact(MessagePactBuilder builder) {
        PactDslJsonBody body = new PactDslJsonBody()
                .stringValue("content", "Hello, Pact!");
                
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("contentType", "application/json");

        return builder
                .expectsToReceive("a message with content")
                .withMetadata(metadata)
                .withContent(body)
                .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "createPact")
    public void testProcessMessage(byte[] messageContent) throws Exception {
        String messageString = new String(messageContent);
        
        // Test the service processes the message correctly
        Message message = messageService.convertToMessage(messageString);
        assertEquals("Hello, Pact!", message.getContent());
    }
}`}
                      </CodeBlock>
                      
                      <CodeBlock language="java" title="MessageProviderPactTest.java">
{`package com.example.demo.pact.provider;

import au.com.dius.pact.provider.MessageAndMetadata;
import au.com.dius.pact.provider.PactVerifyProvider;
import au.com.dius.pact.provider.junit5.MessageTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junitsupport.Consumer;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactFolder;
import com.example.demo.model.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@Provider("message-provider")
@Consumer("message-consumer")
@PactFolder("src/test/resources/pacts")
public class MessageProviderPactTest {

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup(PactVerificationContext context) {
        context.setTarget(new MessageTestTarget());
    }

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void verifyPact(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @PactVerifyProvider("a message with content")
    public MessageAndMetadata verifyMessageForOrder() throws Exception {
        // Create the message that will be sent
        Message message = new Message("Hello, Pact!");
        
        // Convert to JSON
        String messageJson = objectMapper.writeValueAsString(message);
        
        // Set metadata
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("contentType", "application/json");
        
        return new MessageAndMetadata(messageJson.getBytes(), metadata);
    }
}`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="config">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Configuration</CardTitle>
                      <CardDescription>YAML configuration files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock language="yaml" title="application.yml">
{`spring:
  application:
    name: kafka-pact-demo
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: kafka-pact-demo
      auto-offset-reset: earliest

app:
  kafka:
    topic:
      name: message-topic`}
                      </CodeBlock>
                      
                      <CodeBlock language="yaml" title="application-test.yml">
{`spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      auto-offset-reset: earliest
      group-id: test-consumer-group

app:
  kafka:
    topic:
      name: test-message-topic`}
                      </CodeBlock>
                      
                      <CodeBlock language="xml" title="pom.xml">
{`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.1</version>
        <relativePath/>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>kafka-pact-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>kafka-pact-demo</name>
    <description>Demo project for Spring Boot with Kafka and Pact testing</description>
    
    <properties>
        <java.version>17</java.version>
        <pact.version>4.6.3</pact.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
        </dependency>
        
        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <!-- Pact -->
        <dependency>
            <groupId>au.com.dius.pact.consumer</groupId>
            <artifactId>junit5</artifactId>
            <version>\${pact.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>au.com.dius.pact.provider</groupId>
            <artifactId>junit5</artifactId>
            <version>\${pact.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            
            <!-- Pact Plugin -->
            <plugin>
                <groupId>au.com.dius.pact.provider</groupId>
                <artifactId>maven</artifactId>
                <version>\${pact.version}</version>
                <configuration>
                    <pactDirectory>target/pacts</pactDirectory>
                    <pactBrokerUrl>http://localhost:9292</pactBrokerUrl>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`}
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Getting Started</h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Java 17 or higher</li>
                  <li>Maven 3.6+</li>
                  <li>Docker (for running Kafka locally)</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Running Kafka</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash">
{`# Start Kafka using Docker Compose
docker-compose up -d

# Verify Kafka is running
docker-compose ps`}
                </CodeBlock>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Building and Running</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash">
{`# Clone the repository
git clone https://github.com/yourusername/spring-kafka-pact-demo.git
cd spring-kafka-pact-demo

# Build the project
./mvnw clean package

# Run the application
./mvnw spring-boot:run`}
                </CodeBlock>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Running Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="bash">
{`# Run unit and integration tests
./mvnw test

# Run only Pact tests
./mvnw test -Dtest="*Pact*"

# Generate Pact files
./mvnw pact:publish`}
                </CodeBlock>
              </CardContent>
            </Card>
            
            <div className="flex justify-center pt-6">
              <Button className="bg-spring hover:bg-spring-dark">
                View Full Documentation <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
