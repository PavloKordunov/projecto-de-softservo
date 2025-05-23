package com.proj.forum.service.impl;

import com.proj.forum.dto.TagDto;
import com.proj.forum.entity.Tag;
import com.proj.forum.repository.PostRepository;
import com.proj.forum.repository.TagRepository;
import com.proj.forum.service.TagService;
import com.proj.forum.strategy.TagCustomMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


@Service
@Transactional("postgreTransactionManager")
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final TagCustomMapper tagCustomMapper;

    @Override
    public UUID createTag(TagDto tagDto) {
        Tag tag = tagCustomMapper.mapToEntity(tagDto);
        Tag tagFromDB = tagRepository.save(tag);
        return tagFromDB.getId();
    }

    @Override
    public TagDto getTag(UUID id) {
        Tag tag = tagRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Tag not found"));
        return tagCustomMapper.mapToDto(tag);
    }

    @Override
    public List<TagDto> searchTags(String query) {
        List<Tag> tags = tagRepository.findAll();
        return tags.stream()
                .filter(tag -> tag.getName().toLowerCase().startsWith(query.toLowerCase()))
                .map(tagCustomMapper::mapToDto)
                .toList();
    }

    @Override
    public List<TagDto> getAllTags() {
        List<Tag> tagList = tagRepository.findAll();
        if (tagList.isEmpty()) {
            throw new EntityNotFoundException("Tag not found");
        }
        return tagList.stream()
                .map(tagCustomMapper::mapToDto)
                .toList();
    }

    @Override
    public List<TagDto> getSortedTagsByCountPosts(){
        List<Tag> tagList = tagRepository.findAllOrderByPostCountDesc();
        return tagList.stream()
                .map(tagCustomMapper::mapToDto)
                .toList();
    }

}
