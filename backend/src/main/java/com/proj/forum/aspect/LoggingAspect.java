package com.proj.forum.aspect;

import com.proj.forum.annotation.Logging;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Around("within(@com.proj.forum.annotation.Logging *)")
    public Object logExecutionTimeAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long executionTime = System.currentTimeMillis() - start;
        log.info("{} executed in [{}] in {} ms",
                joinPoint.getSignature().getName(), joinPoint.getSignature().getDeclaringTypeName().replaceAll("^.+\\.", ""), executionTime);

        return result;
    }

    @AfterThrowing("within(@com.proj.forum.annotation.Logging *)")
    public void logAfterThrowing(JoinPoint joinPoint) {
        log.error("{} throwing exception", joinPoint.getSignature().getName());
    }
}
