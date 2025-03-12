package com.proj.forum.strategy;

public interface Mapper <S,T> {
    T mapToDto (S source);
    S mapToEntity (T source);
}
