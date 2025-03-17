package com.proj.forum.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.proj.forum.repository",
        entityManagerFactoryRef = "postgreEntityManagerFactory",
        transactionManagerRef = "postgreTransactionManager"
)
public class PostgreSQLDBConfig {

    @Primary
    @Bean(name = "postgreDataSource")
    //@ConfigurationProperties(prefix = "spring.datasource.postgres")
    public DataSource dataSource()
    {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:postgresql://localhost:5432/postgres");
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUsername("postgres");
        dataSource.setPassword("password");
        return dataSource;
        //return DataSourceBuilder.create().build();
    }

    @Primary
    @Bean(name = "postgreEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("postgreDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.proj.forum.entity")
                .persistenceUnit("postgrePU")
                .properties(Map.of("hibernate.hbm2ddl.auto", "update",
                        "hibernate.physical_naming_strategy", "org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy"
                ))
                .build();
    }

    @Primary
    @Bean(name = "postgreTransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("postgreEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}

