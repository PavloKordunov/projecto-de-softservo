package com.proj.forum.strategy.factory;

import com.proj.forum.strategy.Mapper;

public interface MapperFactory {
    <S, T> Mapper<S, T> getMapper(Class<? extends Mapper<S, T>> mapperClass);
}
