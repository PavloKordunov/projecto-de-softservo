package com.proj.forum.strategy.factory;

import com.proj.forum.strategy.CustomMapper;

public interface CustomMapperFactory {
    <S, T> CustomMapper<S, T> getMapper(Class<? extends CustomMapper<S, T>> mapperClass);
}
