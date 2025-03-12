//package com.proj.forum.config;
//
//import jakarta.persistence.EntityManagerFactory;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.orm.jpa.JpaTransactionManager;
//import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
//import org.springframework.transaction.PlatformTransactionManager;
//
//import javax.sql.DataSource;
//
//@Configuration
//public class DataSourceConfig {
//
//    @Bean(name = "postgresDataSource")
//    @Primary
//    @ConfigurationProperties(prefix = "spring.datasource")
//    public DataSource postgresDataSource() {
//        return DataSourceBuilder.create().build();
//    }
//
//    @Bean(name = "h2DataSource")
//    @ConfigurationProperties(prefix = "spring.h2.datasource")
//    public DataSource h2DataSource() {
//        return DataSourceBuilder.create().build();
//    }
//
//    @Bean(name = "postgresEntityManagerFactory")
//    @Primary
//    public LocalContainerEntityManagerFactoryBean postgresEntityManagerFactory(
//            EntityManagerFactoryBuilder builder,
//            @Qualifier("postgresDataSource") DataSource dataSource) {
//        return builder
//                .dataSource(dataSource)
//                .packages("com.proj.forum.entity")
//                .persistenceUnit("application")
//                .build();
//    }
//
//    @Bean(name = "h2EntityManagerFactory")
//    public LocalContainerEntityManagerFactoryBean h2EntityManagerFactory(
//            EntityManagerFactoryBuilder builder,
//            @Qualifier("h2DataSource") DataSource dataSource) {
//        return builder
//                .dataSource(dataSource)
//                .packages("com.proj.forum.model")
//                .persistenceUnit("h2")
//                .build();
//    }
//
//    @Bean(name = "postgresTransactionManager")
//    @Primary
//    public PlatformTransactionManager postgresTransactionManager(
//            @Qualifier("postgresEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
//        return new JpaTransactionManager(entityManagerFactory);
//    }
//
//    @Bean(name = "h2TransactionManager")
//    public PlatformTransactionManager h2TransactionManager(
//            @Qualifier("h2EntityManagerFactory") EntityManagerFactory entityManagerFactory) {
//        return new JpaTransactionManager(entityManagerFactory);
//    }
//}
//
